export function Root() {
  const asd = () => {
    // eslint-disable-next-line no-debugger
    debugger;
  };
  return (
    <div>
      <div>#13 Лендинг с инфой о платформе</div>
      <button onClick={asd} type="button">
        Test debugger
      </button>
    </div>
  );
}
