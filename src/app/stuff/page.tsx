import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export default async function Page() {
  const data = await db.select().from(posts);
  console.log(data);
  return (
    <main>
      <h1>Stuff page</h1>
      <form
        action={async (formData) => {
          "use server";
          const name = formData.get("name");
          if (!name || typeof name !== "string") return;
          await db.insert(posts).values({
            name,
          });
        }}
      >
        <input name="name" />
        <button>Add</button>
      </form>
      <ul className="flex flex-col gap-4">
        {data.map((post) => (
          <Item name={post.name!} id={post.id} key={post.id} />
        ))}
      </ul>
    </main>
  );
}

function Item({ name, id }: { name: string; id: number }) {
  return (
    <li className="flex gap-6">
      ID:{id}
      <span>{name}</span>
    </li>
  );
}
