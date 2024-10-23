import Link from "next/link"
import AuthTitle from "@/components/AuthTitle"
import SignInForm from "@/components/SignInForm"

export default function SignIn() {
  return (
    <article>
            <AuthTitle title="Sign in to SparkUp IT" />
            <section className="grid grid-cols-12">
                <div className="col-start-1 col-end-6">
                    <SignInForm />
                </div>
                <div className="col-start-8 col-end-12">
                    <div className="flex flex-col gap-2">
                        <div className="font-light w-full mt-6">
                            <p className="inline-block">
                                Don't have an account?
                            </p>
                            <Link
                                href="/signup"
                                className="ml-[5px] text-blue-500 underline"
                            >
                                Sign up for free.
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </article>
  )
}
