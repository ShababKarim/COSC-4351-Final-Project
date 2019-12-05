export const ROLES = [
  ["ADMIN", "Global Admin"],
  ["SALES_ADMIN", "Sales Admin"],
  ["ENGG_ADMIN", "Eng. Admin"],
  ["HR_ADMIN", "HR Admin"],
  ["FINANCE_ADMIN", "Finance Admin"]
];

export const LINKROLES = {
  ADMIN: "Global Admin",
  SALES_ADMIN: "Sales Admin",
  ENGG_ADMIN: "Eng. Admin",
  HR_ADMIN: "HR Admin",
  FINANCE_ADMIN: "Finance Admin",
  SUPER_ADMIN: "Super Admin"
};

export async function changePendingStatus(email, adminType, endpoint) {
  try {
    const response = await fetch("http://localhost:5000/" + endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        "x-access-token": sessionStorage.getItem("x-auth-token")
      },
      body: JSON.stringify({
        email,
        adminType
      })
    });
    const res = await response.text();
    if (response.status !== 200) throw new Error(res);
  } catch (err) {
    alert(err);
  }
}

export async function changeAdminStatus(email, adminType, endpoint) {
  try {
    const response = await fetch("http://localhost:5000/" + endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        "x-access-token": sessionStorage.getItem("x-auth-token")
      },
      body: JSON.stringify({
        email,
        adminType
      })
    });
    const res = await response.text();
    if (response.status !== 200) throw new Error(res);
  } catch (err) {
    alert(err);
  }
}
