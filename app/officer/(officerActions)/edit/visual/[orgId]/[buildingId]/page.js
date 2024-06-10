
import StepperForm from "@/components/officer/StepperForm";

function Page({ params }) {
  const { orgId, buildingId } = params;

  return (
    <div className="my-16 mx-8 rounded bg-white">
  

      <StepperForm />
    </div>
  );
}

export default Page;
