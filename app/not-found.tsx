import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="px-4 py-12">
      <EmptyState
        code="৪০৪"
        title="পৃষ্ঠাটি পাওয়া যায়নি"
        message="আপনি যে পণ্য বা ক্যাটাগরি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।"
      />
    </div>
  );
}
