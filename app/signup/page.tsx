import AuthTitle from "@/components/AuthTitle"
import SignUpForm from "@/components/SignUpForm"
import Link from "next/link"

export default function SignUp() {
  return (
    <article>
      <AuthTitle title="Create an account" />
      <section className="grid grid-cols-12">
        <div className="col-start-1 col-end-6">
          <div className="font-light w-full mt-6 mb-8">
            <p className="inline-block">Already have an account?</p>
            <Link
              href="/auth/signin"
              className="ml-[5px] text-blue-500 underline"
            >
              Sign in now.
            </Link>
          </div>
          <SignUpForm />
        </div>
      </section>
    </article>
  )
}
