import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Sidebar, useSidebar, Overlay } from "@rewind-ui/core";
import useAuth from "../hooks/useAuth";
import {
  LuPackageOpen,
  LuUserCircle,
  LuUsers,
  LuMenu,
  LuArrowLeftToLine,
} from "react-icons/lu";

export const SidebarLayout = () => {
  const { auth } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const sidebar = useSidebar();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        color="white"
        onToggle={(state) => {
          setExpanded(state.expanded);
          setMobile(state.mobile);
        }}
        className="absolute"
      >
        <Sidebar.Head className="">
          <Sidebar.Head.Logo>
            <img
              src="/blue-submark.png"
              width={40}
              height={40}
              alt="ReplenX Submark"
            />
          </Sidebar.Head.Logo>
          <Sidebar.Head.Title className="font-extrabold text-blue-800">
            ReplenX
          </Sidebar.Head.Title>
          <Sidebar.Head.Toggle />
        </Sidebar.Head>

        <div className="flex flex-col h-full justify-between">
          <Sidebar.Nav className="flex flex-col h-full justify-between">
            <div>
              <Sidebar.Nav.Section>
                <Sidebar.Nav.Section.Title>
                  Management
                </Sidebar.Nav.Section.Title>
                <Link to="/Dashboard">
                  <div className="hover:bg-gray-100">
                    <Sidebar.Nav.Section.Item
                      icon={<LuUsers className="text-2xl" />}
                      label="My Patients"
                    />
                  </div>
                </Link>
                <Link to="/PatientProfile">
                  <div className="hover:bg-gray-100">
                    <Sidebar.Nav.Section.Item
                      icon={<LuPackageOpen className="text-2xl" />}
                      label="Batch Requests"
                    />
                  </div>
                </Link>

                <Link to="/PatientProfile">
                  <div className="hover:bg-gray-100">
                    <Sidebar.Nav.Section.Item
                      icon={<LuUserCircle className="text-2xl" />}
                      label="My Profile"
                    />
                  </div>
                </Link>
                <Sidebar.Separator />
              </Sidebar.Nav.Section>
            </div>
            <div>
              <Sidebar.Nav.Section>
                <Sidebar.Separator />
                <div className="hover:bg-gray-100">
                  <Sidebar.Nav.Section.Item
                    icon={<LuArrowLeftToLine className="text-2xl" />}
                    label="Logout"
                    href="#"
                  />
                </div>
              </Sidebar.Nav.Section>
            </div>
          </Sidebar.Nav>
        </div>
      </Sidebar>

      {/* Main Content */}
      <div
        className={`flex-1 bg-secondary overflow-auto transition-all duration-300 ${
          expanded ? "ml-64" : "ml-8" // Adjust the margin based on expanded state
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};