using CustomerInfo.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CustomerInfo.DB
{
    public class Dbcon
    {
        private string connectionString = string.Empty;

        private SqlConnection sqlcon;

        public Dbcon()
        {
            connectionString = ConfigurationManager.ConnectionStrings["myConnection"].ToString();
        }
        public void createconnection()
        {
            sqlcon = new SqlConnection(connectionString);
        }

        public void SaveData(CustomerDetail data, out string message)
        {
            try
            {
                createconnection();
                SqlCommand cmd = new SqlCommand("[Personal_INFO]", sqlcon);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                string jsondata = JsonConvert.SerializeObject(data.AddressList);
                string jsonedudata = JsonConvert.SerializeObject(data.EducationList);
                cmd.Parameters.AddWithValue("@Salutation", data.Salutation);
                cmd.Parameters.AddWithValue("@First_Name", data.First_Name);
                cmd.Parameters.AddWithValue("@Last_Name", data.Last_Name);
                cmd.Parameters.AddWithValue("@Phone_Number", data.Phone_Number);
                cmd.Parameters.AddWithValue("@Email", data.Email);
                cmd.Parameters.AddWithValue("@Age", data.Age);
                cmd.Parameters.AddWithValue("@Gender", data.Gender);
                //cmd.Parameters.AddWithValue("@Education", data.Education);
                cmd.Parameters.AddWithValue("@Nationality", data.Nationality);
                cmd.Parameters.AddWithValue("@jsData", jsondata);
                cmd.Parameters.AddWithValue("@jsAddressData", jsonedudata);
                sqlcon.Open();
                cmd.ExecuteNonQuery();
                sqlcon.Close();

                message = "Success";

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

        }
        public List<detailInfo> GetMyData()
        {

            createconnection();
            List<detailInfo> resultList = new List<detailInfo>();
            SqlCommand cmd = new SqlCommand("[selectCustomertbl]", sqlcon);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            sqlcon.Open();
            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                var detailInfo = new detailInfo();
                detailInfo.Salutation = rdr["Salutation"].ToString();
                detailInfo.FirstName = rdr["First_Name"].ToString();
                detailInfo.LastName = rdr["Last_Name"].ToString();
                detailInfo.PhoneNumber = rdr["Phone_Number"].ToString();
                detailInfo.Email = rdr["Email"].ToString();
                detailInfo.Age = rdr["Age"].ToString();
                detailInfo.Gender = rdr["Gender"].ToString();
                detailInfo.Nationality = rdr["Nationality"].ToString();
                detailInfo.CustomerId = int.Parse(rdr["CustomerId"].ToString());

                resultList.Add(detailInfo);
            }
            
            sqlcon.Close();
            return resultList;
        }
        public void DeleteMyData( int? id, out string message)
        {
            try
            {
                createconnection();
                SqlCommand cmd = new SqlCommand("[DeleteInfo]", sqlcon);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CustomerId", id);
                sqlcon.Open();
                cmd.ExecuteNonQuery();
                sqlcon.Close();

                message = "Success";

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

        }
        public CustomerDetail EditMyData(int? Id)
        {
            createconnection();
            CustomerDetail editdetail = new CustomerDetail();
            List<Address> AddList = new List<Address>();
            List<EducationData> EduList = new List<EducationData>();
            SqlCommand cmd = new SqlCommand("[editinfo]", sqlcon);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CustomerId", Id);
            sqlcon.Open();
            SqlDataReader rdr = cmd.ExecuteReader();

            if (rdr.HasRows)
            {
                while (rdr.Read())
                {
                    editdetail.CustomerId = Convert.ToInt32(rdr["CustomerId"]);
                    editdetail.Salutation = rdr["Salutation"].ToString();
                    editdetail.First_Name = rdr["First_Name"].ToString();
                    editdetail.Last_Name = rdr["Last_Name"].ToString();
                    editdetail.Phone_Number = rdr["Phone_Number"].ToString();
                    editdetail.Email = rdr["Email"].ToString();
                    editdetail.Age = rdr["Age"].ToString();
                    editdetail.Gender = rdr["Gender"].ToString();
                    editdetail.Nationality = rdr["Nationality"].ToString();
                    
                }
            }
                if (rdr.NextResult())
                {
                while (rdr.Read())
                {

                    AddList.Add(new Address
                    {
                        addtypeName = rdr["Address_Type"].ToString(),
                        address = rdr["Street_Address"].ToString(),
                        cityName = rdr["City_Name"].ToString(),
                        zip = rdr["Zip"].ToString(),
                        countryName = rdr["Country_Name"].ToString(),
                        contact = rdr["Contact"].ToString()
                    }) ;
                }
                editdetail.AddressList = AddList;
            }
            if (rdr.NextResult())
            {
                while (rdr.Read())
                {

                    EduList.Add(new EducationData
                    {
                        SelectedEducation = rdr["EducationList"].ToString()
                    });
                }
                editdetail.EducationList = EduList;
            }

            sqlcon.Close();
            return editdetail;

           }

        public void UpdateData(CustomerDetail data, out string message)
        {
            try
            {
                createconnection();
                SqlCommand cmd = new SqlCommand("[UpdatePersonalInfo]", sqlcon);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                string jsondata = JsonConvert.SerializeObject(data.AddressList);
                string jsonedudata = JsonConvert.SerializeObject(data.EducationList);
                cmd.Parameters.AddWithValue("@CustomerId", data.CustomerId);
                cmd.Parameters.AddWithValue("@Salutation", data.Salutation);
                cmd.Parameters.AddWithValue("@First_Name", data.First_Name);
                cmd.Parameters.AddWithValue("@Last_Name", data.Last_Name);
                cmd.Parameters.AddWithValue("@Phone_Number", data.Phone_Number);
                cmd.Parameters.AddWithValue("@Email", data.Email);
                cmd.Parameters.AddWithValue("@Age", data.Age);
                cmd.Parameters.AddWithValue("@Gender", data.Gender);
                //cmd.Parameters.AddWithValue("@Education", data.Education);
                cmd.Parameters.AddWithValue("@Nationality", data.Nationality);
                cmd.Parameters.AddWithValue("@jsData", jsondata);
                cmd.Parameters.AddWithValue("@jsAddressData", jsonedudata);
                sqlcon.Open();
                cmd.ExecuteNonQuery();
                sqlcon.Close();

                message = "Success";

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

        }
    }

}