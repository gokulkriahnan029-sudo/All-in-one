

const Confirm = ({setisconfirm,handleformat}) => {

    return(
        <>
        <div className="confirm_overlay"></div>
            <div className="confirm_box">
                <h2>Are You Sure ?</h2>
                <p>click ok to confirm , <br /> To format all saved data from <br /> the todo list</p>
                <br />
                <button onClick={() => setisconfirm(false)} style={{backgroundColor : "white",borderRadius : "5px",width : "80px",marginRight : "4rem"}}>cancel</button>
                <button onClick={handleformat} style={{backgroundColor : "red",borderRadius : "5px",width : "80px"}}>ok</button>
            </div>
        </>
    )
};

export default Confirm;