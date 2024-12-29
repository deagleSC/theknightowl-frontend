import AppLayout from "@/layouts/AppLayout";

export default function Coaches() {

  const breadcrumbData = [
    {
      title: "Browse Coaches",
      url: "/coaches",
    },
  ];

  return (
    <AppLayout breadcrumbData={breadcrumbData} isLoading={true}>
      <></>
    </AppLayout>
  );
}
