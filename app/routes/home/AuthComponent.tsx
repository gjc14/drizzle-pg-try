import { useState } from "react";

import { authClient } from "~/lib/auth-client"; //import the auth client

type session = ReturnType<typeof authClient.useSession>["data"];

export function Auth({ session }: { session: session }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (props: {
    email: string;
    password: string;
    name: string;
    image: string;
  }) => {
    const { data, error } = await authClient.signUp.email(
      {
        email: props.email, // user email address
        password: props.password, // user password -> min 8 characters by default
        name: props.name, // user display name
        image: props.image, // user image url (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          setIsSubmitting(true);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          window.location.href = "/";
        },
        onError: (ctx) => {
          // display the error message
          setIsSubmitting(false);
          console.log(ctx.error);
        },
      }
    );
  };

  const handleSignIn = async (props: { email: string; password: string }) => {
    const { data, error } = await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email: props.email,
        /**
         * The user password
         */
        password: props.password,
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        //callbacks
        onRequest(context) {
          //show loading
          setIsSubmitting(true);
        },
        onSuccess(context) {
          //redirect to the dashboard
          window.location.href = "/";
        },
        onError(context) {
          // display the error message
          setIsSubmitting(false);
          console.log(context.error);
        },
      }
    );
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest(context) {
          //show loading
          setIsSubmitting(true);
        },
        onSuccess: () => {
          //redirect to sign in page
          window.location.href = "/";
        },
        onError(context) {
          // display the error message
          setIsSubmitting(false);
          console.log(context.error);
        },
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      {isSubmitting ? (
        <p>Loading...</p>
      ) : !session ? (
        <div className="flex gap-2">
          <button
            className="border rounded-md px-2 py-1 hover:bg-cyan-900"
            onClick={() => {
              const email = prompt("Enter your email");
              const password = prompt("Enter your password");

              if (!email || !password) {
                alert("Please enter your email and password");
                return;
              }

              handleSignUp({
                email: email,
                password: password,
                name: "name",
                image: "https://placecats.com/200/200",
              });
            }}
          >
            Sign up
          </button>

          <button
            className="border rounded-md px-2 py-1 hover:bg-cyan-900"
            onClick={() => {
              const email = prompt("Enter your email");
              const password = prompt("Enter your password");

              if (!email || !password) {
                alert("Please enter your email and password");
                return;
              }

              handleSignIn({
                email,
                password,
              });
            }}
          >
            Sign in
          </button>
        </div>
      ) : (
        <>
          <p className="text-lg">
            Welcome {session.user.name ?? "[N/A]"} ({session.user.email})
          </p>
          <button
            className="border rounded-md px-2 py-1 hover:bg-cyan-900"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </>
      )}
    </main>
  );
}
