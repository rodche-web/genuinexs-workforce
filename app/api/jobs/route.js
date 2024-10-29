import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database';
import Job from '@/database/models/jobs';

export async function GET(request) {
  try {
    await connectToDatabase()

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');

    let jobsList;

    if (search) {
      jobsList = await Job.find({
        $or: [
          { jobTitle: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } },
        ],
      });
    } else {
      jobsList = await Job.find({});
    }

    return NextResponse.json(
      { data: jobsList },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.jobTitle || !body.department) {
        return NextResponse.json(
          { error: 'Job Title and Department are required' },
          { status: 400 }
        );
    }

    const newJob = await Job.create(body)

    return NextResponse.json(
      { data: newJob },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const result = await Job.deleteMany({ _id: { $in: ids } });

    return NextResponse.json(
      { message: 'Post deleted successfully', deletedCount: result.deletedCount  },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting post' },
      { status: 500 }
    );
  }
}