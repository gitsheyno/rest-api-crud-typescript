import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request: Request) {
  const res = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await res.json();

  const origin = request.headers.get("origin");
  return new NextResponse(JSON.stringify(todos), {
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  if (!id) return NextResponse.json({ message: "id is required" });

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
  });

  return NextResponse.json({ message: "todo deleted" });
}

export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();
  //   const data: Todo = await request.json();

  if (!userId || !title)
    return NextResponse.json({ message: "data requeired" });

  const res = await fetch(`${DATA_SOURCE_URL}`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    }),
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
  });
  console.log(res);
  const newTodo: Todo = await res.json();
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { userId, title, completed, id }: Todo = await request.json();
  //   const data: Todo = await request.json();

  if (!userId || !title || !id || typeof completed !== "boolean")
    return NextResponse.json({ message: "data requeired" });

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      userId,
      title,
      completed,
    }),
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
  });
  console.log(res);
  const updatedTodo: Todo = await res.json();
  return NextResponse.json(updatedTodo);
}
