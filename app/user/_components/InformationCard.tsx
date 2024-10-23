import { Card, CardContent, CardHeader } from "@/components/ui/card"

type InformationCardProps = {
  email: string
  firstName: string
  lastName: string
  address: string
  telephone: string
}

export async function InformationCard({
  email,
  firstName,
  lastName,
  address,
  telephone,
}: InformationCardProps) {
  return (
    <section className="flex flex-wrap gap-5">
      <Card className="basis-1/4 flex-1">
        <CardHeader>
          <h1 className="font-bold">Your email</h1>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-light">{email}</p>
        </CardContent>
      </Card>
      <Card className="basis-1/4 flex-1">
        <CardHeader>
          <h1 className="font-bold">First name</h1>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-light">{firstName}</p>
        </CardContent>
      </Card>
      <Card className="basis-1/4 flex-1">
        <CardHeader>
          <h1 className="font-bold">Last name</h1>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-light">{lastName}</p>
        </CardContent>
      </Card>
      <Card className="basis-1/4 flex-1">
        <CardHeader>
          <h1 className="font-bold">Address</h1>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-light">{address}</p>
        </CardContent>
      </Card>
      <Card className="basis-1/4 flex-1">
        <CardHeader>
          <h1 className="font-bold">Telephone</h1>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-light">{telephone}</p>
        </CardContent>
      </Card>
    </section>
  )
}
