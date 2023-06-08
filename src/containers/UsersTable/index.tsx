import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { collectionGroup, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db, { UserDB } from "../../services/firebase/db";
import { USER_COLLECTION } from "../../services/firebase/db/constants";
import { stopPremium } from "../../services/firebase/db/users";

const columns: ColumnsType<UserDB> | undefined = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Display name",
    dataIndex: "displayName",
    key: "displayName",
  },
  {
    title: "Premium",
    dataIndex: "isDonator",
    key: "isDonator",
    render: (value: boolean) => <div>{value ? "YES" : "NO"}</div>,
  },
  {
    title: "Actions",
    key: "action",
    render: (value, record) => (
      <div>
        {record.isDonator && (
          <>
            <a
              style={{ marginRight: "1rem" }}
              onClick={() => stopPremium(record.id)}
            >
              Stop premium
            </a>
          </>
        )}
      </div>
    ),
  },
];

export default function UsersTable() {
  const [data, setData] = useState<UserDB[]>([]);

  useEffect(() => {
    const getDonates = () => {
      const unsub = onSnapshot(
        query(collectionGroup(db, USER_COLLECTION)),
        async (userSnap) => {
          const userData = userSnap.docs.map((doc) => doc.data() as UserDB);
          setData(userData);
        }
      );

      return () => {
        unsub();
      };
    };

    getDonates();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
