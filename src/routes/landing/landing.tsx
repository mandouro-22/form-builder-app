import { Link } from "@tanstack/react-router";
import { Download, FormInput, Layout, Save } from "lucide-react";

const feature = [
  {
    icon: <Layout className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
    title: "Drag & Drop Builder",
    content:
      "Intuitive interface to build forms by dragging elements onto the canvas",
  },
  {
    icon: <FormInput className="h-12 w-12 text-green-600 mx-auto mb-4" />,
    title: "Rich Form Elements",
    content:
      "Text inputs, checkboxes, radio buttons, selects, date pickers, and more",
  },
  {
    icon: <Save className="h-12 w-12 text-purple-600 mx-auto mb-4" />,
    title: "Save Template",
    content: "Save your forms as reusable templates for future projects",
  },
  {
    icon: <Download className="h-12 w-12 text-orange-600 mx-auto mb-4" />,
    title: "Export Option",
    content: "Export your forms as JSON or generate PDF documents",
  },
];

export default function Landing() {
  return (
    <>
      <section className="container mx-auto py-20 px-4 text-center">
        <div className="flex items-center flex-col gap-y-6 max-w-4xl mx-auto">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Build Forms With{" "}
              <span className="text-cyan-700"> Drag & Drop</span>
            </h1>
          </div>

          <p className="text-gray-700 text-xl max-w-2xl">
            Create professional forms in minutes with our intuitive
            drag-and-drop builder. No coding required - just drag, drop, and
            customize.
          </p>

          <div className="flex items-center justify-center gap-2">
            <Link
              to="/building"
              className="btn bg-gradient-to-tr from-cyan-500 via-cyan-700 to-cyan-800 text-white font-semibold">
              Start Building
            </Link>
            <Link
              to="/template"
              className="btn bg-transparent border text-cyan-800 hover:bg-cyan-800/10 font-semibold">
              Templates
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-gray-900 font-bold text-3xl">
            Powerful Features
          </h1>
          <p className="text-lg font-medium text-gray-600">
            Everything you need to create, customize, and deploy professional
            forms
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {feature.map((item, index) => (
            <div className="bg-white px-4 py-8 rounded-lg shadow" key={index}>
              <div className="">{item.icon}</div>

              <div className="flex flex-col items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900">
                  {item.title}
                </h1>
                <p className="text-center text-gray-600 text-sm">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center bg-cyan-800">
        <div className="container mx-auto flex items-center flex-col gap-y-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Ready to Build Amazing Forms?
            </h1>
          </div>

          <p className="text-gray-100 text-xl">
            Join thousands of users who trust FormCraft for their form building
            needs
          </p>

          <div className="flex items-center justify-center">
            {/* TODO: make route building */}
            <Link
              to="/building"
              className="btn bg-cyan-900 text-white font-semibold shadow-xl">
              Start Building Now
            </Link>
          </div>
        </div>
      </section>

      <section className=" py-14 px-4 text-center bg-gray-900">
        <div className="container flex items-center flex-col gap-y-4 mx-auto">
          <div>
            <h1 className="text-lg font-bold flex items-center gap-x-1 text-white">
              <FormInput className="" />
              FormCraft
            </h1>
          </div>

          <p className="text-gray-300 text-md max-w-2xl">
            © {new Date().getFullYear()} FormCraft. Develop By Omar Mandour{" "}
            {";)"}
          </p>
        </div>
      </section>
    </>
  );
}
