import { useDispatch } from "react-redux";
import { statusOptions, typeOptions, sortOptions } from "../constants";
import {
  filterBySearch,
  sortJobs,
  clearFilters,
} from "../redux/slices/jobSlice";
import { useEffect, useState } from "react";

const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  // her tus vurusunda filtreleme yapma eski cihazlarda kasma ve donmalara sebep olur bunu engellemek için
  // kullanıcı yazma işini bıraktıgında filtreleme yap bu işleme DEBOUNCE deniyor
  useEffect(() => {
    // bir sayac baslat işlemi sayac durdugunda yap

    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 500);

    // egerki sure btimedenn  tekrardan useeffect calısırsa onceki
    // sayacın calısmasını durrdur
    // ! ya da debaounce usehook sitesinde

    return () => {
      clearTimeout(timer);
    };
  }, [text]);
  return (
    <section className="filter_sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket ismine göre ara</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>
        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz</option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz</option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sırala</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))}>
            <option hidden>Seçiniz</option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => dispatch(clearFilters())}
          id="special-button"
          type="reset"
        >
          Filtreleri Sıfırla
        </button>
      </form>
    </section>
  );
};

export default Filter;
