export default async function SearcResult({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;

  return (
    <>
      <h1>Search Result</h1>
      <p>{query}</p>
    </>
  );
}
