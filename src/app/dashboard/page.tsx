import AppLayout from "@/layouts/AppLayout";

export default function Dashboard() {

    const breadcrumbData = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
  ];

  return (
    <AppLayout breadcrumbData={breadcrumbData} isLoading={true}>  
      <></>
    </AppLayout>
  )
}
