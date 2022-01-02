import "./styles.css";
/* k個々の部分をJS側で構築する
  <div class="list-row">
  <li>todoです</li>
  <button>完了</button>
  <button>削除</button>
  </div> 
*/
//追加ボタン要素を取得
const add_btn = document.getElementById("add-btn");
//inputテキストフォームを取得
add_btn.addEventListener("click", () => onClickAdd()); //クリックしたら関数を呼ぶ

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = ""; //値を空にする処理

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除する関数（完了と削除の削除機能）
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //divを生成
  const div = document.createElement("div");
  div.className = "list-row"; //生成したdivにクラスをつける処理

  //liを生成
  const li = document.createElement("li");
  li.innerText = text; //innerTextでテキストを設定する

  //button(完了)生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode);

    //完了リストに追加するリスト
    const addTarget = completeButton.parentNode; //親と成るdivタグをaddTargetとする
    //todo内容テキストを取得
    const text = addTarget.firstElementChild.innerText; //ここはliの中身を取得する

    //div以下を初期化
    addTarget.textContent = null;
    // console.log(addTarget);

    //liタグを生成
    const li = document.createElement("li");
    li.innerText = text;

    //戻すボタンを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグ（div）を完了リストから削除する。戻すボタンだけ関数にしない
      const deleteTarget = backButton.parentNode;
      document.getElementById("completeList").removeChild(deleteTarget);

      //テキストを取得
      const text = deleteTarget.firstElementChild.innerText;
      createIncompleteList(text); //取得したtextで未完了のtodoを作成する
      // console.log(text);
    });

    //divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);
    // console.log(addTarget);

    //完了リストに追加
    document.getElementById("completeList").appendChild(addTarget);
  });

  //button(削除)生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // const deleteTarget = deleteButton.parentNode;
    //押された削除ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
    // console.log(deleteTarget);
  });

  //divタグの子要素に各要素を設定。それからulに追加する
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};
