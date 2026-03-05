import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const Download = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Get the Mobile App</h1>
          <p className="text-gray-500">Plan on the go with Lifeplans.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">iOS</h2>
            <p className="text-gray-600 mb-6">Download from the App Store.</p>
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <a
                href="https://apps.apple.com/us/app/goal-planner-lifeplans/id6756404940"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on App Store
              </a>
            </Button>
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Android</h2>
            <p className="text-gray-600 mb-6">Coming soon on Google Play.</p>
            <Button disabled className="rounded-full">
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Download;
