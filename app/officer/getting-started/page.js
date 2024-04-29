import OfficerGettingStartedForm from '@/components/forms/OfficerGettingStartedForm';

function GettingStartedPage() {
  return (
    <div className="mt-8 mx-8 p-8 rounded bg-white">
      <h2 className="text-2xl font-semibold">Officer General Information</h2>
      <p className="text-sm">
        Please fill the basic information about your organisation
      </p>
      <OfficerGettingStartedForm />
    </div>
  );
}

export default GettingStartedPage;
