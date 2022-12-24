import React, { useEffect, useRef, useState } from "react";
import {

  FileWordOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../redux/Types/ProjectCategoryType";

import { SET_SUBMIT_DRAWER } from "../../redux/Types/DrawerType";
import {  UPDATE_PROJECT_SAGA } from "../../redux/Types/ProjectManagementType";

export default function DrawerEditProject() {
  const dispatch = useDispatch();
  let { projectDetail } = useSelector(
    (state) => state.ProjectManagementReducer
  );
  let [projectInfo, setProjectInfo] = useState({
    projectName: projectDetail.projectName,
    description: "",
    categoryId: projectDetail.projectCategory.id,
    alias: projectDetail.alias,
    creator: projectDetail.creator.id,
    id: projectDetail.id,
    
  });
  useEffect(() => {
    if (projectDetail.id !== projectInfo.id) {
      dispatch({
        type: GET_ALL_PROJECT_CATEGORY_SAGA,
      });
      setProjectInfo({
        projectName: projectDetail.projectName,
        description: projectDetail.description,
        categoryId: projectDetail.projectCategory.id,
        alias: projectDetail.alias,
        creator: projectDetail.creator.id,
        id: projectDetail.id,
      });
    }
    dispatch({
      type: SET_SUBMIT_DRAWER,
      submitAction: handleSubmit,
    });

    return () => {};
  }, [projectInfo, projectDetail]);

  const handleSubmit = (e) => {
    dispatch({
      type: UPDATE_PROJECT_SAGA,
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
      <h4 className="text-center">Thông tin project </h4>
      <form className="row" onSubmit={handleSubmit}>
        <div className="form-group col-6">
          <span className="font-weight-bold">CreatorName</span>
          <Input
            disabled
            value={projectDetail?.creator.name}
            size="large"
            className="form-control"
          ></Input>
        </div>
        <div className="form-group col-6">
          <span className="font-weight-bold">Project Name</span>
          <Input
            onChange={handleChange}
            value={projectInfo.projectName}
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
            value={projectInfo.categoryId}
          >
            {projectCategory?.map((item, index) => {
              if (item.id == projectDetail.projectCategory?.id) {
                return (
                  <option key={index} value={item.id} selected>
                    {item.projectCategoryName}
                  </option>
                );
              }

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
            value={projectInfo.alias}
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
            initialValue={projectDetail.description}
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
