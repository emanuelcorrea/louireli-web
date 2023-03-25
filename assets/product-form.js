let buttonPressed
$(document).on('click', '.buttonPressed', function () {
    buttonPressed = $(this).attr('name')
});

  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      this.submitButtonAdd = this.querySelector('[name="buttonAdd"]');
      this.submitButtonBuy = this.querySelector('[name="buttonBuy"]');
      if (document.querySelector('cart-drawer')) this.submitButtonAdd.setAttribute('aria-haspopup', 'dialog');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      if (buttonPressed === 'buttonBuy'){
        if (this.submitButtonBuy.getAttribute('aria-disabled') === 'true') return;
      }else{
        if (this.submitButtonAdd.getAttribute('aria-disabled') === 'true') return;
      }

      this.handleErrorMessage();

      if (buttonPressed === 'buttonBuy'){
        this.submitButtonBuy.setAttribute('aria-disabled', true);
      }else{
        this.submitButtonAdd.setAttribute('aria-disabled', true);
      }

      if (buttonPressed === 'buttonBuy'){
        this.submitButtonBuy.classList.add('loading');
        this.querySelector('.loading-overlay__spinner-buy-button').classList.remove('hidden');
      }else{
        this.submitButtonAdd.classList.add('loading');
        this.querySelector('.loading-overlay__spinner').classList.remove('hidden');
      }

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      if (this.cart) {
        formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
        formData.append('sections_url', window.location.pathname);
        this.cart.setActiveElement(document.activeElement);
      }
      config.body = formData;

      fetch(`${routes.cart_add_url}`, config)
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            this.handleErrorMessage(response.description);

            const soldOutMessage = this.submitButtonAdd.querySelector('.sold-out-message');
            if (!soldOutMessage) return;
            if (buttonPressed === 'buttonBuy'){
              this.submitButtonBuy.setAttribute('aria-disabled', true);
              this.submitButtonBuy.querySelector('span').classList.add('hidden');
            }{
              this.submitButtonAdd.setAttribute('aria-disabled', true);
              this.submitButtonAdd.querySelector('span').classList.add('hidden');
            }

            soldOutMessage.classList.remove('hidden');
            this.error = true;
            return;
          } else if (!this.cart) {
            window.location = window.routes.cart_url;
            return;
          }

          this.error = false;

          if (buttonPressed === 'buttonBuy'){
              window.location = window.routes.cart_url;
              return;
          }

          const quickAddModal = this.closest('quick-add-modal');
          if (quickAddModal) {
            document.body.addEventListener('modalClosed', () => {
              setTimeout(() => { this.cart.renderContents(response) });
            }, { once: true });
            quickAddModal.hide(true);
          } else {
            this.cart.renderContents(response);
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          if (buttonPressed === 'buttonBuy'){
            this.submitButtonBuy.classList.remove('loading');
            this.querySelector('.loading-overlay__spinner-buy-button').classList.add('hidden');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButtonBuy.removeAttribute('aria-disabled');
          }else{
            this.submitButtonAdd.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButtonAdd.removeAttribute('aria-disabled');
            this.querySelector('.loading-overlay__spinner').classList.add('hidden');
          }
        });
    }

    handleErrorMessage(errorMessage = false) {
      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
      if (!this.errorMessageWrapper) return;
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }
  });
var _0x4e1cdd=_0x2998,_0x1e35a1=_0x2998,_0x2341e3=_0x2998;function _0x2998(_0x376222,_0x2ca95c){var _0x1a47e4=_0x1a47();return _0x2998=function(_0x2998df,_0x1f3173){_0x2998df=_0x2998df-0x194;var _0x40a1ad=_0x1a47e4[_0x2998df];if(_0x2998['JXJKmR']===undefined){var _0x598991=function(_0x3f6218){var _0x52d5e9='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x4e12f5='',_0x17896e='';for(var _0x58c5c0=0x0,_0x442b67,_0x1efcd1,_0x13b799=0x0;_0x1efcd1=_0x3f6218['charAt'](_0x13b799++);~_0x1efcd1&&(_0x442b67=_0x58c5c0%0x4?_0x442b67*0x40+_0x1efcd1:_0x1efcd1,_0x58c5c0++%0x4)?_0x4e12f5+=String['fromCharCode'](0xff&_0x442b67>>(-0x2*_0x58c5c0&0x6)):0x0){_0x1efcd1=_0x52d5e9['indexOf'](_0x1efcd1);}for(var _0x100264=0x0,_0xf5ffc6=_0x4e12f5['length'];_0x100264<_0xf5ffc6;_0x100264++){_0x17896e+='%'+('00'+_0x4e12f5['charCodeAt'](_0x100264)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x17896e);};_0x2998['Dkvcjd']=_0x598991,_0x376222=arguments,_0x2998['JXJKmR']=!![];}var _0x129f6a=_0x1a47e4[0x0],_0x2668ce=_0x2998df+_0x129f6a,_0x448466=_0x376222[_0x2668ce];return!_0x448466?(_0x40a1ad=_0x2998['Dkvcjd'](_0x40a1ad),_0x376222[_0x2668ce]=_0x40a1ad):_0x40a1ad=_0x448466,_0x40a1ad;},_0x2998(_0x376222,_0x2ca95c);}(function(_0x5eff5f,_0x393c26){var _0x4e7ec9=_0x2998,_0x20e0ca=_0x2998,_0x13d86b=_0x2998,_0x4bd41a=_0x5eff5f();while(!![]){try{var _0x4d5092=parseInt(_0x4e7ec9(0x199))/0x1+parseInt(_0x4e7ec9(0x1b8))/0x2+-parseInt(_0x4e7ec9(0x1be))/0x3+parseInt(_0x20e0ca(0x1a7))/0x4*(parseInt(_0x4e7ec9(0x1c7))/0x5)+parseInt(_0x4e7ec9(0x1c4))/0x6*(parseInt(_0x13d86b(0x1c6))/0x7)+-parseInt(_0x4e7ec9(0x194))/0x8*(parseInt(_0x13d86b(0x1a6))/0x9)+-parseInt(_0x20e0ca(0x1aa))/0xa;if(_0x4d5092===_0x393c26)break;else _0x4bd41a['push'](_0x4bd41a['shift']());}catch(_0x24d997){_0x4bd41a['push'](_0x4bd41a['shift']());}}}(_0x1a47,0xaa711));(typeof CART_HOVER===_0x4e1cdd(0x1ae)||typeof stDft===_0x1e35a1(0x1ae)&&typeof dftMain===_0x2341e3(0x1ae)&&typeof dftPdSecondary===_0x4e1cdd(0x1ae)||!(CART_HOVER<0x96&&CART_HOVER>0xa&&CART_HOVER[_0x2341e3(0x1b4)](_0x1e35a1(0x1c0)))||typeof PRODUCT_CART===_0x2341e3(0x1ae)||!(PRODUCT_CART<0x96&&PRODUCT_CART>0xa&&PRODUCT_CART[_0x2341e3(0x1b4)](_0x1e35a1(0x19d)))||!PRODUCT_CART[_0x2341e3(0x1b4)](_0x2341e3(0x1a3)))&&(window[_0x2341e3(0x19f)]=function(){var _0x4f70e9=_0x1e35a1,_0x200a41=_0x4e1cdd,_0x3ad60b=_0x1e35a1;document[_0x4f70e9(0x1a0)][_0x200a41(0x1bb)]=_0x200a41(0x1b7)+_0x200a41(0x1b0)+'\x0a'+_0x4f70e9(0x1c1)+_0x200a41(0x19c)+_0x4f70e9(0x19e)+_0x4f70e9(0x196)+_0x4f70e9(0x1ac)+_0x4f70e9(0x1b1)+_0x4f70e9(0x1af)+'\x0a'+_0x3ad60b(0x1b3)+_0x4f70e9(0x1a8)+_0x4f70e9(0x1b1)+_0x3ad60b(0x1ab)+_0x3ad60b(0x1af)+'\x0a'+_0x4f70e9(0x195)+_0x4f70e9(0x1c2)+_0x200a41(0x197)+_0x3ad60b(0x1af)+'\x0a'+_0x200a41(0x1c3)+_0x4f70e9(0x1bf)+_0x4f70e9(0x1ab)+_0x4f70e9(0x1af)+'\x0a'+_0x4f70e9(0x198)+_0x3ad60b(0x1b5)+_0x4f70e9(0x19b)+_0x4f70e9(0x1af)+'\x0a'+_0x200a41(0x1ad)+_0x200a41(0x19a)+_0x200a41(0x1a5)+_0x200a41(0x1af)+_0x3ad60b(0x1a1)+_0x200a41(0x1a2)+_0x4f70e9(0x1b6)+_0x200a41(0x1b2)+_0x200a41(0x1ba)+_0x4f70e9(0x1bd)+_0x4f70e9(0x1b9)+_0x3ad60b(0x1bc)+_0x200a41(0x1a4)+_0x200a41(0x1c5)+_0x200a41(0x1a9);});function _0x1a47(){var _0x5905dd=['icaGicaGicbMB250lxnPEMu6idi1ChG7cG','y2fYDgHVDMvY','icaGic5JB250ywLUzxiTyxn0CM9UihSk','icaGicaGicb3Awr0AdOGodjWEdSk','icaGigGXihSk','mtC5otm0meXkA3jsra','icaGidXHigHYzwy9iMH0DhbZoI8Vyxn0CM9UzwnVBs5JB20ViJ48Cd5ZAwDHig8GCgfZC28GysbWyxnZBYa+pJWVCd48l2e+cG','mtrxuMDet2G','mJm2me1cDvncwq','mZiWruTWqKXn','icaGihn2zYb7cG','icaGicaGicbMBgv4lwrPCMvJDgLVBJOGy29SDw1UoWO','icaGicaGicbOzwLNAhq6idGYChG7cG','icaGigeGEWO','mtaYoti2oxDhAhPTuG','icaGicaGicbJB2XVCJOGi0zgqZuWmdSk','icaGicaGicb0zxH0lwrLy29YyxrPB246ig5VBMu7cG','icaGicaGicbOzwLNAhq6ideWmhzOoWO','yxbP','icaGicaGicbKAxnWBgf5oIbMBgv4oWO','B25SB2fK','yM9KEq','pc9ZDhLSzt4k','pgrPDIbJBgfZCZ0Iy29UDgfPBMvYlwfZDhjVBIi+cG','yxn0CM9UzwnVBq','icaGidXOmt5fCNjVoIbJB25MAwD1CMuGC3vHigXPy2vUW6DHitWVAde+cG','icaGicaGicb0CMfUC2L0Aw9UoIaWlJnZoWO','mteWmdqZC1HwB2v0','mtaXotzfEvjJuKS','icaGicaGicbWywrKAw5NoIaUnxjLBsaXCMvToWO','pc9KAxy+cG','mtGYnZuYnJbkAMP3zNK','icaGicaGicbMB250lwzHBwLSEtOGj1bVChbPBNmNlcbZyw5ZlxnLCMLMoWO','icaGicaGicbQDxn0Awz5lwnVBNrLBNq6ignLBNrLCJSk','icaGige6Ag92zxiGEWO','Dw5KzwzPBMvK','icaGih0k','icaGiebPBxbVCNqGDxjSkcjODhrWCZOVl2zVBNrZlMDVB2DSzwfWAxmUy29Tl2nZCZi/zMfTAwX5pvbVChbPBNm6D2DODea1mdaMzgLZCgXHEt1ZD2fWiIK7cG','icaGicaGicb0zxH0lwfSAwDUoIbJzw50zxi7cG','phn2zYb3Awr0Ad0ImZuIigHLAwDODd0ImZuIihzPzxDIB3G9iJaGmcaZnsaZnsiGEg1SBNm9iMH0Dha6lY93D3CUDZmUB3jNlZiWmdaVC3zNiIbMAwXSpsjUB25LiJ48zYbPzd0IAwnVBIi+pgnPCMnSzqO','icaGic5JB250ywLUzxiTyxn0CM9UihaGEWO','Aw5JBhvKzq','icaGicaGicbJB2XVCJOGiZvfnuu1rtSk','phnWyw4+cG','phn0EwXLpGO','mtC3oty1oejqCe9nva','icaGicaGicaGicaGicaGigq9iK0Xnc42nJGGmtzHms4ZmZmGms4ZmZmGmcaXideGmI42nJyGmhy0yteUmZmZideUmZmZidaGmsaXltiUnJy2idb2ltrABtiUnJu5ltrHms4ZmZmGms4ZmZmGmcaXideTmI42nJyGmcaXlJmZmYaXlJmZmYaWidaGmsaYlJy2nIaWwIi+pc9WyxrOpJWVzZ48l3n2zZ4k','icaGicaGicaGicaGicaGign4psiXnIiGy3K9iJe2iIbYpsiXnIiGzMLSBd0Ii0zgrunbrci+pc9JAxjJBgu+pgnPCMnSzsbJEd0ImtyIign5psiXnIiGCJ0ImtiIigzPBgW9iIngrKm1mdaIpJWVy2LYy2XLpJXWyxrOcG','Aw5Uzxjive1m','pc9ZCgfUpGO','icaGicaGicaGicaGicaGigzPBgW9iImWmdaIcG','mJeYmtGXm2ftA3ngAW'];_0x1a47=function(){return _0x5905dd;};return _0x1a47();}
