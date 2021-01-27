import React from "react";

function Layout(props) {

  return (
    <div className="chat-container">
        <header className="chat-header">
            <h1><i className="fas fa-smile"></i> Masai</h1>
        </header>
        <main className="chat-main">
            {props.children}
        </main>
    </div>
  );
}

export default Layout;