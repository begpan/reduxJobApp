import { v4 } from "uuid";
import { statusOptions, typeOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";

const AddJob = () => {
  // stateler
  const jobState = useSelector((store) => store.jobReducer);

  // kurulumlar
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki verilere erişsin

    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());

    // tarih ve id ekle
    newJobData.date = new Date().toLocaleDateString("tr");
    newJobData.id = v4();

    // apiye veri ekle

    axios
      .post("http://localhost:3001/jobs", newJobData)
      .then(() => {
        toast.success("Yeni iş eklendi");

        // storea ekle
        dispatch(createJob(newJobData));

        // anasayfa ya yoonelenrir
        navigate("/");
      })
      .catch(() => {
        toast.error("Ekleme işleminde sorun oluştu");
      });
  };

  // dizideki deglerieri aynı olan elemanları kaldır
  const removeDuplicates = (key) => {
    // sadece pozisyonlardan olusan bir dizi tanımla
    const arr = jobState.jobs.map((job) => job[key]);
    // DİZİ İÇERİEİSNDEN TEKRAR EDEN ELEMANI KALDIR

    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);
    // fonksiyonun cagrıldıgı yere dondur
    return filtred;
  };

  console.log(removeDuplicates("position"));
  console.log(removeDuplicates("location"));

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="position_list" name="position" type="text" />
            <datalist id="position_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Şirket</label>
            <input list="company_list" name="company" type="text" />
            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input list="location_list" name="location" type="text" />
            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select required name="status">
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tip</label>
            <select required name="type">
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button id="special-button"> Ekle</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
