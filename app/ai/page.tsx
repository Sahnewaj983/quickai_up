import { Gem, Sparkles } from "lucide-react"
import { getUserCreationsAction } from "@/lib/actions/user";
import CreationItem from "@/components/dashboard/CreationItem";

// async function getDashboardData() {

//   // const res = await fetch(
//   //   `${process.env.NEXT_PUBLIC_APP_URL}/api/user/get-user-creations`,
//   //   {
//   //     cache: "no-store",
//   //   }
//   // );
// }


const page = async  () => {

  const data = await getUserCreationsAction();
  const creations = data.creations || [];
  const plan = data.plan || "free";

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div  className="flex justify-start gap-4 flex-wrap">

        {/* Total Creations */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#3588f2] to-[#0bb0d7] text-white
          flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active plan  */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold capitalize">
              {plan}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#ff61c5] to-[#9e53ee] text-white
          flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Recent creation */}
      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creation</p>
        {
           creations.map((item: any) => (
            <CreationItem
              key={item.id}
              item={item}
            />
          ))
        }
      </div>



    </div>
  )
}

export default page