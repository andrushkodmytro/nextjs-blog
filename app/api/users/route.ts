import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import User from '@/app/models/User';
import { userRegistrationScheme } from './validation';
import * as Yup from 'yup';

// export async function GET() {
//   await dbConnect();

//   const user = await User.find({});

//   return NextResponse.json({ user });
// }

function isMongoDBError(error: unknown) {
  if (
    error &&
    typeof error === 'object' &&
    'name' in error &&
    error.name === 'MongoServerError' &&
    'code' in error &&
    error.code === 11000 &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return true;
  }

  return false;
}

type Errors = {
  [key: string]: string[];
};

class ApiValidationError extends Error {
  constructor(public errors: Errors) {
    super();
    this.name = 'ApiValidationError';
  }
}

function normalizeError(error: unknown): ApiValidationError {
  if (error instanceof Yup.ValidationError) {
    let errors: Errors = {};

    error.inner.forEach((err) => {
      const key = err?.path || 'all';
      errors[key] = err.errors;
    });

    const newError = new ApiValidationError(errors);

    return newError;
  }

  return new ApiValidationError({});
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();

    const validatedData = await userRegistrationScheme.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });

    const user = await User.create(validatedData);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    // Yup validation error
    if (error instanceof Yup.ValidationError) {
      const data = normalizeError(error);
      return NextResponse.json(data, { status: 422 });
    }

    // MongoDB unique error
    if (isMongoDBError(error)) {
      const data = new ApiValidationError({
        email: ['This email is already in use', 'Test'],
      });
      return NextResponse.json(data, { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
}
