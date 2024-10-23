interface AuthTitleProps {
  title: string;
}

export default function AuthTitle({ title }: AuthTitleProps) {
  return (
    <h1 className="font-bold text-[4rem] mt-12 mb-[2.4rem]">
      {title}
    </h1>
  )
}
