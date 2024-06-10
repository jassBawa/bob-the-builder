import AddBuildingForm from "@/components/forms/org/AddBuildingForm";

function Addbuilding() {

  return (
    <>
      <div className="mt-16 mx-8 rounded bg-white p-8">
        <h2 className="text-2xl font-semibold">
          Please add building data here
        </h2>
        <AddBuildingForm />      
      </div>
    </>
  );
}

export default Addbuilding;
