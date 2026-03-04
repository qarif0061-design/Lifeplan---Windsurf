import { NextRequest, NextResponse } from 'next/server';
import { 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  collection,
  query,
  where,
  getDoc
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Goal } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  try {
    const goalsQuery = query(collection(db, "goals"), where("userId", "==", userId));
    const goalsSnapshot = await getDocs(goalsQuery);
    const goals = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Goal }));
    return NextResponse.json(goals);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const goalData = await request.json() as Goal;

  try {
    const goalRef = await addDoc(collection(db, "goals"), goalData);
    return NextResponse.json({ id: goalRef.id, ...goalData });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}