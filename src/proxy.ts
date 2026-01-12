import { publicDecrypt } from "crypto";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
//logic
export function proxy(request: NextRequest) {
  //if someone has token (logged in) then he should not be able to visit public paths -> login and signup page
  //And there are some protected path wich only allowed ones should see-> for ex -> the ones which have not logged in yet cannot see profile page

  //so how can i get on which path i am -> through request(since we have NextRequest)

  const path = request.nextUrl.pathname;
  const is_public_path =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (is_public_path && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!is_public_path && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

//Match
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/verifyemail"],
};

/*So the middleware has the access to all the req 
and whenever a req is made the middle ware is called automatically
so it allows to run some code before the req is completed
for ex if someone is not authorised to visit the home page it will stop it and redirect to some other page

The proxy.js|ts file is used to write Proxy and run code on
the server before a request is completed. Then, based on 
the incoming request, you can modify the response by rewriting, 
redirecting, modifying the request or response headers, 
or responding directly.

proxy.ts code ->
two parts ->
1st -> function (logic) part -> what to do
2nd -> matching part -> when to do (on what route) -> we can also give an array of routes we want to match
*/
