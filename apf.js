/**
 * Created by claudio.g.silva on 16/09/14.
 */

/**
 * @param param
 * {RLAR, DER, FATOR, TIPO}
 */
function calculaPF(param){
    if(!param.RLAR || !param.DER){
        return {};
    }

    if(!param.TIPO){
        return {};
    }

    if(!param.FATOR){
        param.FATOR = 1;
    }

    param.COMPLEXIDADE = '';

    if(param.TIPO == 'EE'){
        if(
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 0 && param.DER < 5) ||
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 4 && param.DER < 16) ||
            (param.RLAR == 2 && param.DER > 0 && param.DER < 5)
        ){
            param.COMPLEXIDADE = 'simples';
        }else if(
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 15) ||
            (param.RLAR == 2 && param.DER > 4 && param.DER < 16) ||
            (param.RLAR > 2 && param.DER > 0 && param.DER < 5)
        ){
            param.COMPLEXIDADE = 'medio';
        }else if(
            (param.RLAR == 2 && param.DER > 15) ||
            (param.RLAR > 2 && param.DER > 4 && param.DER < 16) ||
            (param.RLAR > 2 && param.DER > 15)
        ){
            param.COMPLEXIDADE = 'complexo';
        }
    }else if(param.TIPO == 'CE' || param.TIPO == 'SE'){
        if(
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 0 && param.DER < 6) ||
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 5 && param.DER < 20) ||
            (param.RLAR > 1 && param.RLAR < 4 && param.DER > 0 && param.DER < 5)
        ){
            param.COMPLEXIDADE = 'simples';
        }else if(
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 19) ||
            (param.RLAR > 1 && param.RLAR < 4 && param.DER > 5 && param.DER < 20) ||
            (param.RLAR > 3 && param.DER > 0 && param.DER < 6)
        ){
            param.COMPLEXIDADE = 'medio';
        }else if(
            (param.RLAR > 1 && param.RLAR < 4 && param.DER > 19) ||
            (param.RLAR > 3 && param.DER > 5 && param.DER < 20) ||
            (param.RLAR > 3 && param.DER > 19)
        ){
            param.COMPLEXIDADE = 'complexo';
        }

    }else if(param.TIPO == 'ALI' || param.TIPO == 'AIE'){
        if(
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 0 && param.DER < 20) ||
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 19 && param.DER < 51) ||
            (param.RLAR > 1 && param.RLAR < 6 && param.DER > 0 && param.DER < 20)
        ){
            param.COMPLEXIDADE = 'simples';
        }else if(
            ((param.RLAR == 1 || param.RLAR == 0) && param.DER > 50) ||
            (param.RLAR > 1 && param.RLAR < 6 && param.DER > 19 && param.DER < 51) ||
            (param.RLAR > 5 && param.RLAR > 0 && param.DER < 20)
        ){
            param.COMPLEXIDADE = 'medio';
        }else if(
            (param.RLAR > 1 && param.RLAR < 6 && param.DER > 50) ||
            (param.RLAR > 5 && param.DER > 19 && param.DER < 51) ||
            (param.RLAR > 5 && param.DER > 50)
        ){
            param.COMPLEXIDADE = 'complexo';
        }
    }

    if(!param.COMPLEXIDADE){
        return {};
    }

    if(param.TIPO == 'EE' || param.TIPO == 'CE'){
        switch(param.COMPLEXIDADE){
            case 'simples': param.PFB = 3; break;
            case 'medio': param.PFB = 4; break;
            case 'complexo': param.PFB = 6; break;
        }
    }else if(param.TIPO == 'SE'){
        switch(param.COMPLEXIDADE){
            case 'simples': param.PFB = 4; break;
            case 'medio': param.PFB = 5; break;
            case 'complexo': param.PFB = 7; break;
        }

    }else if(param.TIPO == 'ALI'){
        switch(param.COMPLEXIDADE){
            case 'simples': param.PFB = 7; break;
            case 'medio': param.PFB = 10; break;
            case 'complexo': param.PFB = 15; break;
        }
    }else if(param.TIPO == 'AIE'){
        switch(param.COMPLEXIDADE){
            case 'simples': param.PFB = 5; break;
            case 'medio': param.PFB = 7; break;
            case 'complexo': param.PFB = 10; break;
        }
    }

    if(!param.PFB){
        return {};
    }

    param.PFF = parseFloat((param.PFB * param.FATOR).toFixed(2));

    return {
        pf_bruto : param.PFB,
        pf_final : param.PFF,
        complexidade : param.COMPLEXIDADE,
        fator : param.FATOR
    }
}