import React from "react";
import firebase from "../firebase/firebaseConfig";
import { useGymData } from "../hooks/useGymData";
import { useForm } from "../hooks/useForm";
import { Button, Layout, Avatar, Menu, Icon } from "antd";

const Dashboard = props => {
  const [gyms, addGym, getGym, deleteGym] = useGymData();
  const [values, handleChange, handleSubmit] = useForm({ name: "" }, onSubmit);

  function onSubmit() {
    addGym(values.name);
  }
  const { Sider, Header, Content } = Layout;
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <Avatar size={64} icon='user' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={["4"]}>
          <Menu.Item key='1'>
            <Icon type='user' />
            <span className='nav-text'>nav 1</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type='video-camera' />
            <span className='nav-text'>nav 2</span>
          </Menu.Item>
          <Menu.Item key='3'>
            <Icon type='upload' />
            <span className='nav-text'>nav 3</span>
          </Menu.Item>
          <Menu.Item key='4'>
            <Icon type='bar-chart' />
            <span className='nav-text'>nav 4</span>
          </Menu.Item>
          <Menu.Item key='5'>
            <Icon type='cloud-o' />
            <span className='nav-text'>nav 5</span>
          </Menu.Item>
          <Menu.Item key='6'>
            <Icon type='appstore-o' />
            <span className='nav-text'>nav 6</span>
          </Menu.Item>
          <Menu.Item key='7'>
            <Icon type='team' />
            <span className='nav-text'>nav 7</span>
          </Menu.Item>
          <Menu.Item key='8' />
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <h1>
            <button onClick={() => firebase.auth().signOut()}>logout</button>
            Dashboard
            <form onSubmit={handleSubmit}>
              <input
                name={"name"}
                value={values.name}
                onChange={handleChange}
              />
              <Button onClick={handleSubmit}>Add Gym</Button>
              <Button onClick={() => deleteGym()}>Delete Gym</Button>
            </form>
          </h1>
        </Header>
        <Content>
          <h1>page content</h1>
          {gyms &&
            Object.values(gyms).map((gym: { name: string; id: string }) => {
              debugger;
              return (
                <>
                  <h3>{gym.name}</h3>
                  <Button onClick={() => deleteGym(gym.id)}>Delete</Button>
                </>
              );
            })}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
