import React, {useState, useEffect} from "react";
import {Form, Input, Button, Alert, Typography} from "antd";

const {Title} = Typography;
const {TextArea} = Input;

function CreateRecipePage() {
  const [formData, setFormData] = useState({title: "", description: "", ingredients: "", instructions: "", created_by: "", prep_time: 0, cook_time: 0,});

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, 
  [formData, form]
  );

  const handleSubmit = async (values) => {
    setError("");
    setMessage("");
    const cleanedRecipe = {
      ...values,
      prep_time: parseInt(values.prep_time, 10),
      cook_time: parseInt(values.cook_time, 10)
    };

    try {
      const response = await fetch(`http://localhost:3000/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:password123")       // This is admin login hardcoded
        },
        body: JSON.stringify(cleanedRecipe)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error ${response.status}: ${errorData.error || errorData.message}`);
      }

      setMessage("Recipe created successfully!");
      form.resetFields();
      setFormData({title: "", description: "", ingredients: "", instructions: "", created_by: "", prep_time: 0, cook_time: 0,});
    } 
    catch (err) {
      console.error("Error creating recipe:", err);
      setError(`Failed to create recipe: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Title level={2} style={{textAlign: "center"}}>Create a New Recipe</Title>

      {message && <Alert message={message} type="success" showIcon style={{ marginBottom: "15px" }} />}
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "15px" }} />}

      <Form
        form={form}
        name="create_recipe_form"
        onFinish={handleSubmit}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{required: true, message: "Please input the title of the recipe!"}]}
        >
          <Input placeholder="Recipe Title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea rows={4} placeholder="Brief description of the recipe" />
        </Form.Item>

        <Form.Item
          name="ingredients"
          label="Ingredients"
          rules={[{required: true, message: "Please list the ingredients!"}]}
        >
          <TextArea rows={6} placeholder="List ingredients (comma separated)" />
        </Form.Item>

        <Form.Item
          name="instructions"
          label="Instructions"
          rules={[{ required: true, message: "Please provide cooking instructions!" }]}
        >
          <TextArea rows={8} placeholder="Step-by-step cooking instructions (comma separated)" />
        </Form.Item>

        <Form.Item
          name="created_by"
          label="Created By"
          rules={[{ required: true, message: "Please specify the creator!" }]}
        >
          <Input placeholder="Your Name" />
        </Form.Item>

        <Form.Item
          name="prep_time"
          label="Preparation Time (minutes)"
        >
          <Input type="number" min={0} placeholder="e.g., 30" />
        </Form.Item>

        <Form.Item
          name="cook_time"
          label="Cook Time (minutes)"
        >
          <Input type="number" min={0} placeholder="e.g., 60" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Recipe
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateRecipePage;