import { A, json, RouteDataArgs, useRouteData } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import Counter from "~/components/Counter";


export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    async (undefined, { request }) => {
      const randomNumber = Math.floor(Math.random() * 100);
     const randomTodo = await fetch("https://jsonplaceholder.typicode.com/todos/" + randomNumber);
      const todo = await randomTodo.json();
      return {
        todo,
      };
    }
  );
}

export default function Home() {
  const todo = useRouteData<typeof routeData>();

  const [enrolling, { Form }] = createServerAction$(
    async (form: FormData, { request }) => {
      // do something with the form data
      const fakeDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await fakeDelay(1000);
      return json(
        { success: true },  
      );
    }
  );
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="text-4xl font-bold">Current todo response:</h1>
      <pre>{JSON.stringify(todo(), null, 2)}</pre>
      <h1 class="text-4xl font-bold">Generate another todo</h1>
      <Form>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          {enrolling.pending ? "Loading..." : "Generate"}
        </button>
      </Form>
    </main>
  );
}
