export default function Layout(props) {
  // console.log(props);
  const { children } = props;

  return (
    <>
      <header>
        <h1 className="text-gradient">Copacetic</h1>
      </header>

      <main>{children}</main>

      <footer>
        <small>Created by</small>
        <a alt="pfp" href="https://github.com/KellyBytes" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/203674919?u=436e3115e15e3b792898a3f09017270e125c4794&v=4" />
          <p>@KellyBytes</p>
          <i className="fa-brands fa-github"></i>
        </a>
      </footer>
    </>
  );
}
