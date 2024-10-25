import axios from "axios";
import React,{useEffect,useState} from "react";

function Video() {
  const [addpost,setaddpost]=useState(null)
  const [values,setvalues]= useState({postcontent:'',userid:null})
  const [file,setfile]=useState('')
  const [postresult,setpostresult]=useState([])

  useEffect(()=>{
    axios.post('http://localhost:5000/post/viewpost')
    .then(res=>setpostresult(res.data))
  })

  const formdata = new FormData()
  formdata.append('userid',values.userid)
  formdata.append('postcontent',values.postcontent)
  formdata.append('file',file)

  const insertpost = ()=>{
    axios.post('http://localhost:5000/post/addpost',formdata)
    .then(res=>{
      alert('new post created')
      window.location.reload()
    })
  }
  return (
    <div className="top2">
      <h3 className="videoh">post</h3>
      <div className="createpost" onClick={()=>setaddpost('addpost')}>create new post</div>
      {addpost && <div className="newpostform">
        <h3>cretate new post</h3>
        <img src={require("../icon/close.png")} className="close" onClick={()=>setaddpost(null)}/>
        <form onSubmit={(e)=>{e.preventDefault();insertpost()}}>
          <label htmlFor="">choose file </label>
          <input type="file" name="file" id="" onChange={(e)=>setfile(e.target.files[0])}/>
          <label htmlFor="">write content</label>
          <textarea name="" id="" required onChange={(e)=>setvalues({...values,postcontent:e.target.value})}></textarea>
          <button>create</button>
        </form>
      </div>}
      <div className="videobody">
       {postresult.map(post=>(
        <div className="post-conatiner">
          <div className="profile">
          <img src={`http://localhost:5000/uploads/${post.profile_picture}`} alt="Uploaded" className="pic"/> 
            <div className="pnames">
              <b>{post.username}</b>
              <small>2 days ago</small>
            </div>
            <img src={require("../icon/more.png")} className="settingpost" />
          </div>
          <p className="content">{post.post_content}</p>
          {post.post_file  && <video className="videopath" controls>
            <source src={`http://localhost:5000/postvideo/${post.post_file}`}/>
          </video>}
          <div className="videoevent">
            <p>
              <img src={require("../icon/hearts.png")} className="eventicon" />
              <small>likes:10</small>
            </p>
            <p>
              <img src={require("../icon/comment.png")} className="eventicon" />
              <small>comment</small>
            </p>
            <p>
              <img src={require("../icon/share.png")} className="eventicon" />
              <small>share</small>
            </p>
          </div>
        </div>
       ))}
        
      </div>
    </div>
  );
}

export default Video;
