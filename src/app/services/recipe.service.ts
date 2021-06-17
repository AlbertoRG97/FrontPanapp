import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginServiceService } from './login-service.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl = "http://recetas.allsites.es/public/api"

  flours: any

  Hydration: any

  Others: any

  Steps: any

  Image: any

  recipe: any

  constructor(private http:HttpClient,
    private LoginService:LoginServiceService,
    private NavController:NavController) { }

  setFlours($flours){
    this.flours = $flours
  }
  setHydration($Hydration){
    this.Hydration = $Hydration
  }
  setOthers($Others){
    this.Others = $Others
  }
  setSteps($Steps){
    this.Steps = $Steps
  }
  setImage($image){
    this.Image = $image
  }
  setRecipe($recipe){
    this.recipe = $recipe
  }

    getRecipes(){
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/recipe',
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
        })
        .subscribe(data => {
        resolve(data);
        }, err => {
          console.log(err);
        });
        });
    }
    getRecipe($id){
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/recipe/'+$id,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
        })
        .subscribe(data => {
        resolve(data);
        }, err => {
          console.log(err);
        });
        });
    }

    getHydration($id){
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/hydration/'+$id,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
        })
        .subscribe(data => {
        resolve(data);
        }, err => {
          console.log(err);
        });
        });
    }

    getOthers($id){
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/others/'+$id,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
        })
        .subscribe(data => {
        resolve(data);
        }, err => {
          console.log(err);
        });
        });
    }

    getFlours($id){
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/flour/'+$id,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
        })
        .subscribe(data => {
        resolve(data);
        }, err => {
          console.log(err);
        });
        });
    }

    getSteps($id){
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/steps/'+$id,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
        })
        .subscribe(data => {
        resolve(data);
        }, err => {
          console.log(err);
        });
        });
    }
  
  createRecipe(){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/recipe',
      {
        user_id : this.recipe['user_id'],
        name : this.recipe['name'],
        description : this.recipe['description'],
        image : this.Image
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        this.createFlours(data)
      }, err => {
        console.log(err)
      })
    })
  }

  createFlours($recipeData){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/flour',
      {
        recipe_id : $recipeData.Recipe.id,
        harina_blanca_trigo : this.flours['harina_blanca_trigo'],
        harina_integral_trigo : this.flours['harina_integral_trigo'],
        harina_blanca_espelta : this.flours['harina_blanca_espelta'],
        harina_integral_espelta : this.flours['harina_integral_espelta'],
        harina_blanca_centeno : this.flours['harina_blanca_centeno'],
        harina_integral_centeno : this.flours['harina_integral_centeno'],
        semola_trigo : this.flours['semola_trigo'],
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        this.createHydration($recipeData.Recipe.id)
      }, err => {
        console.log(err)
      })
    })
  }

  createHydration($id){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/hydration',
      {
        recipe_id : $id,
        agua : this.Hydration['agua'],
        leche : this.Hydration['leche'],
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        this.createOthers($id)
      }, err => {
        console.log(err)
      })
    })
  }

  createOthers($id){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/others',
      {
        recipe_id : $id,
        manteca : this.Others['manteca'],
        aceite_oliva : this.Others['aceite_oliva'],
        grasa : this.Others['grasa'],
        semillas : this.Others['semillas'],
        pure_patata : this.Others['pure_patata'],
        huevo : this.Others['huevo'],
        masa_madre : this.Others['masa_madre'],
        levadura_seca : this.Others['levadura_seca'],
        levadura_fresca : this.Others['levadura_fresca'],
        salt : this.Others['salt'],
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        this.createSteps($id)
      }, err => {
        console.log(err)
      })
    })
  }

  createSteps($id){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/steps',
      {
        recipe_id : $id,
        step_1 : this.Steps['step_1'],
        step_2 : this.Steps['step_2'],
        step_3 : this.Steps['step_3'],
        step_4 : this.Steps['step_4'],
        step_5 : this.Steps['step_5'],
        step_6 : this.Steps['step_6'],
        step_7 : this.Steps['step_7'],
        step_8 : this.Steps['step_8'],
        step_9 : this.Steps['step_9'],
        step_10 : this.Steps['step_10'],
        step_11 : this.Steps['step_11'],
        step_12 : this.Steps['step_12'],
        step_13 : this.Steps['step_13'],
        step_14 : this.Steps['step_14'],
        step_15 : this.Steps['step_15'],
        step_16 : this.Steps['step_16'],
        step_17 : this.Steps['step_17'],
        step_18 : this.Steps['step_18'],
        step_19 : this.Steps['step_19'],
        step_20 : this.Steps['step_20'],
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        this.NavController.navigateRoot('/tabs')
      }, err => {
        console.log(err)
      })
    })
  }

  publicRecipe($id){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/recipe/'+$id,
      {
        public : 1
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err)
      })
    })
  }

  editFlours($id){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/flour/'+$id,
      {
        recipe_id : $id,
        harina_blanca_trigo : this.flours['harina_blanca_trigo'],
        harina_integral_trigo : this.flours['harina_integral_trigo'],
        harina_blanca_espelta : this.flours['harina_blanca_espelta'],
        harina_integral_espelta : this.flours['harina_integral_espelta'],
        harina_blanca_centeno : this.flours['harina_blanca_centeno'],
        harina_integral_centeno : this.flours['harina_integral_centeno'],
        semola_trigo : this.flours['semola_trigo'],
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
      }, err => {
        console.log(err)
      })
    })
  }

  editHydration($id){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/hydration/'+$id,
      {
        recipe_id : $id,
        agua : this.Hydration['agua'],
        leche : this.Hydration['leche'],
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
      }, err => {
        console.log(err)
      })
    })
  }

  editOthers($id){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/others/'+$id,
      {
        recipe_id : $id,
        manteca : this.Others['manteca'],
        aceite_oliva : this.Others['aceite_oliva'],
        grasa : this.Others['grasa'],
        semillas : this.Others['semillas'],
        pure_patata : this.Others['pure_patata'],
        huevo : this.Others['huevo'],
        masa_madre : this.Others['masa_madre'],
        levadura_seca : this.Others['levadura_seca'],
        levadura_fresca : this.Others['levadura_fresca'],
        salt : this.Others['salt'],
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
      }, err => {
        console.log(err)
      })
    })
  }

  editSteps($id){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/steps/'+$id,
      {
        recipe_id : $id,
        step_1 : this.Steps['step_1'],
        step_2 : this.Steps['step_2'],
        step_3 : this.Steps['step_3'],
        step_4 : this.Steps['step_4'],
        step_5 : this.Steps['step_5'],
        step_6 : this.Steps['step_6'],
        step_7 : this.Steps['step_7'],
        step_8 : this.Steps['step_8'],
        step_9 : this.Steps['step_9'],
        step_10 : this.Steps['step_10'],
        step_11 : this.Steps['step_11'],
        step_12 : this.Steps['step_12'],
        step_13 : this.Steps['step_13'],
        step_14 : this.Steps['step_14'],
        step_15 : this.Steps['step_15'],
        step_16 : this.Steps['step_16'],
        step_17 : this.Steps['step_17'],
        step_18 : this.Steps['step_18'],
        step_19 : this.Steps['step_19'],
        step_20 : this.Steps['step_20'],
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
      }, err => {
        console.log(err)
      })
    })
  }

  editName($id, $name){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/recipe/'+$id,
      {
        name : $name
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
      }, err => {
        console.log(err)
      })
    })
  }

  editDesc($id, $name){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/recipe/'+$id,
      {
        description : $name
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
      }, err => {
        console.log(err)
      })
    })
  }

  editImage($id, $image){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/recipe/'+$id,
      {
        image : $image
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
      }, err => {
        console.log(err)
      })
    })
  }

  reportRecipe($id){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/recipe/'+$id,
      {
        reported : 1
      },{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err)
      })
    })
  }

  deleteRecipe($id){
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/recipe/'+$id,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err)
      })
    })
  }

}
