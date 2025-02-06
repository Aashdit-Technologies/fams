import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import AdminMain from "../AdminMain/AdminMain";
import Hierarchy from "../Hierarchy/Hierarchy";
import Despatch from "../DespatchSection/Despatch";
import DiarySection from "../DiarySection/DiarySection";
import LetterList from "../Inbox/LetterList";
import Letter from "../Letter/Letter";
import "./Admin.css";
import MainFile from "../FileSection/MainFile";
import Scheduling from "../FileSection/Scheduling";
import ManageRoom from "../ManageRoom/ManageRoom";
import ManageRack from "../ManageRack/ManageRack";
import ManageActivity from "../ManageActivity/ManageActivity";
import ManageFile from "../ManageFile/ManageFile";


const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]); // Store API menu items

  const handleMenuData = (data) => {
    setMenuItems(data);
  };


  const getFlatMenuItems = (items) => {
    const flatMenu = [];
    items.forEach((menu) => {
      if (menu.children && menu.children.length > 0) {
        flatMenu.push(...getFlatMenuItems(menu.children));
      }
      flatMenu.push(menu);
    });
    return flatMenu;
  };

  const flatMenuItems = getFlatMenuItems(menuItems);

  const lazyLoadComponent = (componentName) => {
    try {
      return React.lazy(() => import(`../${componentName}`));
    } catch (error) {
      console.error(`Error loading component: ${componentName}`, error);
      return null;
    }
  };

  return (
    <div className="admin-layout">
      <Header collapsed={collapsed} />
      <div className={`parent-container ${collapsed ? "collapsed" : ""}`}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMenuData={handleMenuData}
        />
        <AdminMain collapsed={collapsed}>
          <Routes>
            
            <Route 
              index 
              element={
                <div className="welcome-page">
                  <h1>Welcome to File Management System</h1>
                </div>
              } 
            />

            <Route 
              path="hierarchy" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Hierarchy />
                </React.Suspense>
              } 
            />
            <Route 
              path="file" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ManageFile />
                </React.Suspense>
              } 
            />
            <Route 
              path="system/setup/menu/init" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Letter />
                </React.Suspense>
              } 
            />
            <Route 
              path="scheduling" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Scheduling />
                </React.Suspense>
              } 
            />
            <Route 
              path="manage-room" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ManageRoom />
                </React.Suspense>
              } 
            />
            <Route 
              path="manage-rack" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ManageRack />
                </React.Suspense>
              } 
            />
            <Route 
              path="manage-activity" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ManageActivity />
                </React.Suspense>
              } 
            />
            <Route 
              path="main-file" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <MainFile />
                </React.Suspense>
              } 
            />
            <Route 
              path="diary-section" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <DiarySection />
                </React.Suspense>
              } 
            />
            <Route 
              path="despatch-section" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Despatch />
                </React.Suspense>
              } 
            />
            <Route 
              path="letter-section" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <LetterList />
                </React.Suspense>
              } 
            />

            {menuItems.map((menu) => {
              
              if (menu.menuURL === '#') {
                
                if (menu.children?.length > 0) {
                  return menu.children.map(child => {
                    const Component = child.menuComponent ? lazyLoadComponent(child.menuComponent) : null;
                    const path = child.menuURL; 
                    return (
                      <Route
                        key={child.menuId}
                        path={path}
                        element={
                          Component ? (
                            <React.Suspense fallback={<div>Loading...</div>}>
                              <Component />
                            </React.Suspense>
                          ) : (
                            <h1>{child.menuText}</h1>
                          )
                        }
                      />
                    );
                  });
                }
                return null;
              }

              if (menu.menuURL === '/hierarchy' || 
                  menu.menuURL === '/file' || 
                  menu.menuURL === '/system/setup/menu/init' || 
                  menu.menuURL === '/scheduling' || 
                  menu.menuURL === '/manage-room' || 
                  menu.menuURL === '/manage-rack' || 
                  menu.menuURL === '/manage-activity' ||
                  menu.menuURL === '/diary-section' ||
                  menu.menuURL === '/despatch-section' ||
                  menu.menuURL === '/letter-section') {
                return null;
              }

             
              const Component = menu.menuComponent ? lazyLoadComponent(menu.menuComponent) : null;
              const path = menu.menuURL; 
              return (
                <Route
                  key={menu.menuId}
                  path={path}
                  element={
                    Component ? (
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <Component />
                      </React.Suspense>
                    ) : (
                      <h1>{menu.menuText}</h1>
                    )
                  }
                />
              );
            })}

            <Route 
              path="*" 
              element={
                <div className="not-found">
                  <h1>Page Not Found</h1>
                </div>
              } 
            />
          </Routes>
        </AdminMain>
      </div>
    </div>
  );
};

export default Admin;
