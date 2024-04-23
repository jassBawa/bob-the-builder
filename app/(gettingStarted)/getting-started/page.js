import GettingStartedForm from '@/components/forms/GettingStartedForm';

function GettingStartedPage() {
  return (
    <div className="mt-8 mx-8 p-8 rounded bg-white">
      <h2 className="text-2xl font-semibold">General Information</h2>
      <p className="text-sm">
        Please fill the basic information about your organisation
      </p>
      <GettingStartedForm />
    </div>
  );
}

export default GettingStartedPage;
