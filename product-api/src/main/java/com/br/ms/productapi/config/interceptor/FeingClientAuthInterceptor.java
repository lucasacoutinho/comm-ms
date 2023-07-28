package com.br.ms.productapi.config.interceptor;

import org.springframework.http.HttpHeaders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.br.ms.productapi.config.exception.ValidationException;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;

public class FeingClientAuthInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        var currentRequest = getCurrenRequest();

        template.header(HttpHeaders.AUTHORIZATION, currentRequest.getHeader(HttpHeaders.AUTHORIZATION));
    }

    private HttpServletRequest getCurrenRequest() {
        try {
            ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes();
            if (requestAttributes != null) {
                return requestAttributes.getRequest();
            } else {
                throw new ValidationException("Current request could not be processed");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ValidationException("Current request could not be processed");
        }
    }
}
