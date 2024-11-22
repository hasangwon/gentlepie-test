const App: React.FC = () => {
  return (
    <div className="container">
      {/* 항상 보이는 영역 */}
      <div className="layout-1 bg-red-100">
        <h1>항상 보이는 레이아웃 1</h1>
      </div>

      {/* 키보드가 올라오면 줄어드는 영역 */}
      <div className="layout-2 bg-blue-100">
        <input type="text" placeholder="텍스트 입력" />

        <p>줄어드는 레이아웃 2</p>
        <p>키보드가 올라오면 이 영역이 줄어듭니다.</p>
      </div>
    </div>
  );
};

export default App;
