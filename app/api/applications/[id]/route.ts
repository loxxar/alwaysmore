import { NextResponse } from "next/server";
import {
  deleteApplication,
  updateApplicationStatus,
  type ApplicationStatus,
} from "@/lib/applications-repository";
import { isAdminRequestAuthenticated } from "@/lib/api-admin-auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const isAuthenticated = await isAdminRequestAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const status = body?.status as ApplicationStatus;

    if (!id || Number.isNaN(Number(id))) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    if (!["pending", "reviewed", "accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }

    await updateApplicationStatus(Number(id), status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /api/applications/[id] error", error);
    return NextResponse.json(
      { error: "Impossible de mettre à jour le statut" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const isAuthenticated = await isAdminRequestAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;

    if (!id || Number.isNaN(Number(id))) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    await deleteApplication(Number(id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/applications/[id] error", error);
    return NextResponse.json(
      { error: "Impossible de supprimer la candidature" },
      { status: 500 },
    );
  }
}
