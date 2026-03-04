import { NextRequest, NextResponse } from 'next/server';
import { 
  getDoc, 
  doc, 
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Goal } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const goalId = searchParams.get('id');

  if (!goalId) {
    return NextResponse.json({ error: 'Goal ID required' }, { status: 400 });
  }

  try {
    const goalDoc = await getDoc(doc(db, "goals", goalId));
    if (goalDoc.exists()) {
      return NextResponse.json({ id: goalDoc.id, ...goalDoc.data() as Goal });
    } else {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const goalId = searchParams.get('id');
  const updates = await request.json();

  if (!goalId) {
    return NextResponse.json({ error: 'Goal ID required' }, { status: 400 });
  }

  try {
    await updateDoc(doc(db, "goals", goalId), updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const goalId = searchParams.get('id');

  if (!goalId) {
    return NextResponse.json({ error: 'Goal ID required' }, { status: 400 });
  }

  try {
    await deleteDoc(doc(db, "goals", goalId));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}