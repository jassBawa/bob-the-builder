
import NDTForm from "@/components/forms/officer/NDTForm";

function Page({ params }) {
  const { orgId, buildingId } = params;

  return (
    <div className="my-16 mx-8 rounded bg-white">
  

      <NDTForm />
    </div>
  );
}

export default Page;
