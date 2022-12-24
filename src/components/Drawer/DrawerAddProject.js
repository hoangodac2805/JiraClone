import React, { useEffect, useState } from "react";
import {
  FileWordOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../redux/Types/ProjectCategoryType";

import { SET_SUBMIT_DRAWER } from "../../redux/Types/DrawerType";
import { CREATE_PROJECT_SAGA } from "../../redux/Types/ProjectManagementType";

export default function DrawerAddProject() {
  const dispatch = useDispatch();
  let [projectInfo, setProjectInfo] = useState({
    projectName: "",
    description: "",
    categoryId: "1",
    alias: "",
  });
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
    dispatch({
      type: SET_SUBMIT_DRAWER,
      submitAction: handleSubmit,
    });

    return () => {};
  }, [projectInfo]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch({
      type: CREATE_PROJECT_SAGA,
      projectInfo: projectInfo,
    });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    let projectInfoUpdate = { ...projectInfo };
    projectInfoUpdate[name] = value;

    setProjectInfo(projectInfoUpdate);
  };
  const handleEditorChange = (content, editor) => {
    setProjectInfo({
      ...projectInfo,
      description: content,
    });
  };
  let { projectCategory } = useSelector(
    (state) => state.ProjectStatusAndCateReducer
  );
  
  return (
    <div className="container-fluid">
      <h4 className="text-center">Thông tin project mới</h4>
      <form className="row" onSubmit={handleSubmit}>
        <div className="form-group col-12">
          <span className="font-weight-bold">Project Name</span>
          <Input
            onChange={handleChange}
            size="large"
            name="projectName"
            placeholder="Project Name"
            prefix={<FileWordOutlined />}
            className="form-control"
          ></Input>
        </div>
        <div className="form-group col-6">
          <span className="font-weight-bold">Category</span>
          <br></br>
          <select
            onChange={handleChange}
            name="categoryId"
            className=" form-control"
          >
            {projectCategory?.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-6">
          <span className="font-weight-bold">Alias</span>
          <Input
            onChange={handleChange}
            size="large"
            name="alias"
            placeholder="Alias"
            prefix={<DiffOutlined />}
            className="form-control"
          ></Input>
        </div>
        <div className="col-12">
          <span className="font-weight-bold">Description</span>
          <Editor
            onEditorChange={handleEditorChange}
            name="description"
            apiKey="your-api-key"
      
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      </form>
    </div>
  );
}
