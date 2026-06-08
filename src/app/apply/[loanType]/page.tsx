import { redirect } from "next/navigation";

export default async function ApplyEntry({
  params,
}: {
  params: Promise<{ loanType: string }>;
}) {
  const { loanType } = await params;
  redirect(`/apply/${loanType}/loan`);
}
