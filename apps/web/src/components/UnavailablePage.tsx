export function UnavailablePage({ title, description }: { title: string; description: string }) {
  return (
    <section className="tool-page" aria-labelledby="tool-title">
      <div className="pane-heading">
        <h1 id="tool-title">{title}</h1>
        <span className="status-label">暂未开放</span>
      </div>
      <p className="tool-description">{description}</p>
    </section>
  );
}
