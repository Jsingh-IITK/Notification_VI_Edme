import { redirect } from "next/navigation"

export default function WorkflowsIndexRedirect() {
  redirect("/workflows/new")
  return null
}
