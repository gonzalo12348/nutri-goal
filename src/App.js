import React, { useState } from 'react';
import './App.css'; // Asegúrate de importar el CSS aquí

function App() {
  const [gender, setGender] = useState('hombre');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('sedentario');
  const [goal, setGoal] = useState('mantener');
  const [deficit, setDeficit] = useState('leve');
  const [superavit, setSuperavit] = useState('leve');
  const [customCalories, setCustomCalories] = useState('');
  const [result, setResult] = useState('');

  const calcularBMR = () => {
    let bmr;
    const peso = parseFloat(weight);
    const altura = parseFloat(height);
    const edadNum = parseInt(age);
    const customCals = parseFloat(customCalories) || 0;

    if (gender === 'hombre') {
      bmr = (10 * peso) + (6.25 * altura) - (5 * edadNum) + 5;
    } else {
      bmr = (10 * peso) + (6.25 * altura) - (5 * edadNum) - 161;
    }

    let multiplicador;
    switch (activity) {
      case 'sedentario':
        multiplicador = 1.2;
        break;
      case 'poco_activo':
        multiplicador = 1.375;
        break;
      case 'moderado_activo':
        multiplicador = 1.55;
        break;
      case 'muy_activo':
        multiplicador = 1.725;
        break;
      case 'extra_activo':
        multiplicador = 1.9;
        break;
      default:
        multiplicador = 1.2;
    }

    let caloriasMantenimiento = bmr * multiplicador;

    if (customCals !== 0) {
      caloriasMantenimiento += customCals;
    } else if (goal === 'definir') {
      if (deficit === 'leve') {
        caloriasMantenimiento -= 200;
      } else if (deficit === 'moderado') {
        caloriasMantenimiento -= 350;
      } else if (deficit === 'jefaso') {
        caloriasMantenimiento -= 500;
      }
    } else if (goal === 'volumen') {
      if (superavit === 'leve') {
        caloriasMantenimiento += 200;
      } else if (superavit === 'moderado') {
        caloriasMantenimiento += 350;
      } else if (superavit === 'jefaso') {
        caloriasMantenimiento += 500;
      }
    }

    setResult(
      `Tu metabolismo basal (BMR) es: ${bmr.toFixed(2)} calorías/día. Para ${goal}, necesitas: ${caloriasMantenimiento.toFixed(2)} calorías/día.`
    );
  };

  return (
    <div className="container">
      <h1>Calculadora de Metabolismo Basal y Objetivos</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-section">
          <div className="input-column">
            <label>
              Género:
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
            </label>

            <label>
              Peso (kg):
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </label>

            <label>
              Altura (cm):
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
            </label>

            <label>
              Edad:
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </label>
          </div>

          <div className="input-column">
            <label>
              Nivel de actividad:
              <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                <option value="sedentario">Sedentario (0 veces al gym)</option>
                <option value="poco_activo">Poco Activo (1-2 veces al gym)</option>
                <option value="moderado_activo">Moderadamente Activo (2-4 veces al gym)</option>
                <option value="muy_activo">Muy Activo (5-7 veces al gym)</option>
                <option value="extra_activo">Extra Activo (5-7 veces + trabajo físico)</option>
              </select>
            </label>

            <label>
              Objetivo:
              <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="mantener">Mantener peso</option>
                <option value="definir">Definir</option>
                <option value="volumen">Ganar Volumen</option>
              </select>
            </label>

            {goal === 'definir' && (
              <label>
                Elige el nivel de déficit:
                <select value={deficit} onChange={(e) => setDeficit(e.target.value)}>
                  <option value="leve">Leve (-200 cal)</option>
                  <option value="moderado">Moderado (-350 cal)</option>
                  <option value="jefaso">Jefaso (-500 cal)</option>
                </select>
              </label>
            )}

            {goal === 'volumen' && (
              <label>
                Elige el nivel de superávit:
                <select value={superavit} onChange={(e) => setSuperavit(e.target.value)}>
                  <option value="leve">Leve (+200 cal)</option>
                  <option value="moderado">Moderado (+350 cal)</option>
                  <option value="jefaso">Jefaso (+500 cal)</option>
                </select>
              </label>
            )}

            <label>
              O personaliza tu ajuste calórico:
              <input type="number" value={customCalories} onChange={(e) => setCustomCalories(e.target.value)} />
            </label>
          </div>
        </div>
        <button className="submit-btn" type="button" onClick={calcularBMR}>Calcular</button>
      </form>

      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default App;
